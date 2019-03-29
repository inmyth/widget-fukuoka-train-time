package martiply.me.widget.fukuoka.train.time.model;

/**
 * Created by desktop on 2017/03/05.
 */

public class Ref {

    private Integer time;
    private boolean isBenri;


    public Ref(Integer time, boolean isBenri) {
        this.time = time;
        this.isBenri = isBenri;
    }
    public Ref(Integer time) {
        this.time = time;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public boolean isBenri() {
        return isBenri;
    }

    public void setBenri(boolean benri) {
        isBenri = benri;
    }
}
