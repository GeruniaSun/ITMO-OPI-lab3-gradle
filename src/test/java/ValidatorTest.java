import lt.braineater.itmo.web3.utils.Calculator;
import lt.braineater.itmo.web3.utils.Validator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(Parameterized.class)
public class ValidatorTest {
    private final double x;
    private final double y;
    private final int r;
    private final boolean expected;

    public ValidatorTest(double x, double y, int r, boolean expected) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.expected = expected;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                {0, 0, 1, true},
                {2.5, -3.7, 4, true},
                {-5.0, 5.0, 5, true},
                {5.0, 5.0, 5, true},
                {-5.0, -5.0, 1, true},
                {3.999, -4.999, 2, true},

                {5.1, 2, 3, false},
                {-5.1, 3, 2, false},
                {Double.NaN, 0, 1, false},
                {2, 5.1, 4, false},
                {-3, -5.1, 3, false},
                {0, Double.NaN, 2, false},
                {1, 1, 0, false},
                {0, 0, 6, false},
                {-1, -2, -3, false},
                {6, 6, 0, false},
                {5.1, 4, 3, false},
                {3, 5.1, 2, false},
                {0, 0, 6, false},
                {5.000001, 0, 3, false},
                {0, -5.000001, 2, false}
        });
    }

    @Test
    public void testValidateForm() {
        boolean actual = Validator.validateForm(x, y, r);
        assertThat("For x=" + x + ", y=" + y + ", r=" + r, actual, is(expected));
    }
}

