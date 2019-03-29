package martiply.me.widget.fukuoka.train.time.widget;

import android.annotation.SuppressLint;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.widget.RemoteViews;



import java.util.Calendar;
import java.util.Locale;
import java.util.TreeMap;

import martiply.me.widget.fukuoka.train.time.R;
import martiply.me.widget.fukuoka.train.time.model.Model;
import martiply.me.widget.fukuoka.train.time.model.Ref;


@RequiresApi(api = Build.VERSION_CODES.DONUT)
public class MainWidget extends AppWidgetProvider {

    private static final int INTERVAL_MILLIS = 1000 * 60;
    private PendingIntent pendingIntent = null;


    public static class UpdateService extends Service {
        private static final String ACTION_UPDATE = "com.martinbudi.nakasuwidget.action.UPDATE";

        @Nullable
        @Override
        public IBinder onBind(Intent intent) {
            return null;
        }

        @Override
        public int onStartCommand(Intent intent, int flags, int startId) {
            updateWidget(this);
            return super.onStartCommand(intent, flags, startId);
        }
    }


    @SuppressLint("ShortAlarm")
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);
        final AlarmManager m = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        final Intent i = new Intent(context, UpdateService.class);
        if (pendingIntent == null)
        {
            pendingIntent = PendingIntent.getService(context, 0, i, PendingIntent.FLAG_CANCEL_CURRENT);
        }

        m.setRepeating(AlarmManager.RTC, System.currentTimeMillis(), INTERVAL_MILLIS, pendingIntent);
        updateWidget(context);
    }

    private static void updateWidget(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName thisWidget = new ComponentName(context, MainWidget.class);
        int[]ids = manager.getAppWidgetIds(thisWidget);
        final int N = ids.length;
        for (int awID : ids) {
            RemoteViews remoteViews = buildRemoteViews(context);
            ComponentName clockWidget = new ComponentName(context, MainWidget.class);
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            appWidgetManager.updateAppWidget(clockWidget, remoteViews);
            manager.updateAppWidget(awID, remoteViews);
        }
    }

    public static RemoteViews buildRemoteViews(Context context){
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget_main);

        Model nakasu = getNextTime(!isHoliday() ? Schedule.nakasuKaizuka : Schedule.nakasuKaizukaHoliday, getIntTime());
        setTextView(remoteViews, R.id.nakasu_a, nakasu.getA());
        setTextView(remoteViews, R.id.nakasu_b, nakasu.getB());
        setTextView(remoteViews, R.id.nakasu_c, nakasu.getC());

        Model tenjin = getNextTime(!isHoliday() ? Schedule.tenjinKaizuka : Schedule.tenjinKaizukaHoliday, getIntTime());
        setTextView(remoteViews, R.id.tenjin_a, tenjin.getA());
        setTextView(remoteViews, R.id.tenjin_b, tenjin.getB());
        setTextView(remoteViews, R.id.tenjin_c, tenjin.getC());

        Model chiyo = getNextTime(!isHoliday() ? Schedule.chiyoTenjin : Schedule.chiyoTenjinHoliday, getIntTime());
        setTextView(remoteViews, R.id.chiyo_a, chiyo.getA());
        setTextView(remoteViews, R.id.chiyo_b, chiyo.getB());
        setTextView(remoteViews, R.id.chiyo_c, chiyo.getC());


        return  remoteViews;

    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        context.stopService(new Intent(context, UpdateService.class));
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        Intent intent = new Intent(UpdateService.ACTION_UPDATE);
        intent.setPackage("com.martinbudi.nakasuwidget");
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            context.startForegroundService(intent);
//        } else {
            context.startService(intent);
//        }
    }

    public static Model getNextTime(TreeMap<Integer, Ref> map, int current){
        int LAST_INDEX = map.size() -1;

        Ref a=null, b=null,c=null;
        int i = 0;

        if(current > map.lastKey()){
            return new Model(map.get(LAST_INDEX), null, null);
        }

        while (a == null && current <= map.lastKey()){
            a = map.get(current);
            current++;
        }

        while (b == null && current <= map.lastKey() && a != null){
            b = map.get(current);
            current++;
        }
        while (c == null && current <= map.lastKey() && b != null){
            c = map.get(current);
            current++;
        }

        return new Model(a,b,c);
    }


    private static int getIntTime(){
        Calendar cal = Calendar.getInstance(Locale.JAPAN); // get current time in a Calendar
        return cal.get(Calendar.HOUR_OF_DAY) * 100 + cal.get(Calendar.MINUTE);
    }

    private  static boolean isHoliday(){
        Calendar cal = Calendar.getInstance(Locale.JAPAN); // get current time in a Calendar
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        if (dayOfWeek == Calendar.SUNDAY || dayOfWeek == Calendar.SATURDAY){
            return true;
        }
        int month = cal.get(Calendar.MONTH);
        int dayInMonth = cal.get(Calendar.DAY_OF_MONTH);

        return Schedule.holidays.contains(month * 100 + dayInMonth);
    }


    private static void setTextView(RemoteViews remoteViews, int textViewId, Ref ref ){
        if (ref == null){
            remoteViews.setTextViewText(textViewId, "null");
        }else{
            remoteViews.setTextViewText(textViewId, ref.isBenri() ? String.valueOf(ref.getTime()) + "*" : String.valueOf(ref.getTime()));
        }
    }

}