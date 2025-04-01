package lt.braineater.itmo.web3.model;

public class Attempt {
    private final float x;
    private final float y;
    private final int r;
    private final Boolean hit;
    private final String currTime;

    public Attempt(float x, float y, int r, Boolean hit, String currTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.currTime = currTime;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public Boolean getHit() {
        return hit;
    }

    public String getCurrTime() {
        return currTime;
    }
}