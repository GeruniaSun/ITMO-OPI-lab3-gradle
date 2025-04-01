package lt.braineater.itmo.web3.utils;

public class Calculator {
    public static boolean calcHit(float x, float y, int r){
        if (x > 0 && y > 0) return false;                           // 1-я четверть
        else if (x <= 0 && y >= 0) return x * x + y * y <= r * r;   // 2-я четверть
        else if (x <= 0 && y < 0) return y >= -x - (float) r / 2;   // 3-ья четверть
        else return y >= -r && x <= (float) r /2;                   // 4-я четверть
    }
}