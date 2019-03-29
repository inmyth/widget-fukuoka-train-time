package martiply.me.widget.fukuoka.train.time.model;


public class Model {

    private Ref a,b,c;

    public Model(){
    }

    public Model(Ref a, Ref b, Ref c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public Ref getA() {
        return a;
    }

    public void setA(Ref a) {
        this.a = a;
    }

    public Ref getB() {
        return b;
    }

    public void setB(Ref b) {
        this.b = b;
    }

    public Ref getC() {
        return c;
    }

    public void setC(Ref c) {
        this.c = c;
    }
}
