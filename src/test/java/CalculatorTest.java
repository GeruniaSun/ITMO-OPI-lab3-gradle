import lt.braineater.itmo.web3.utils.Calculator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(Parameterized.class)
public class CalculatorTest {
    private final float x;
    private final float y;
    private final int r;
    private final boolean expected;

    public CalculatorTest(float x, float y, int r, boolean expected) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.expected = expected;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                // 1-я четверть
                {1, 1, 3, false},
                {0.5f, 0.5f, 5, false},
                // 2-я четверть
                {-1, 1, 2, true},
                {-2, 0, 2, true},
                {-3, 0, 2, false},
                {-1, 2, 2, false},
                // 3-я четверть
                {-2, -1, 2, false},
                {-1, -1, 2, false},
                {-1, 0, 2, true},
                {-2, -2, 2, false},
                // 4-я четверть
                {1, -1, 4, true},
                {3, -1, 4, false},
                {1, -5, 4, false},
                {2, -4, 4, true}
        });
    }

    @Test
    public void testCalcHit() {
        boolean actual = Calculator.calcHit(x, y, r);
        assertThat("For x=" + x + ", y=" + y + ", r=" + r, actual, is(expected));
    }
}
