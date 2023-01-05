package com.calc.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class req {
    public String calcTwoPar(double n1, double n2, char sign) {
        switch (sign) {
            case '+':
                return Double.toString(n1 + n2);
            case '-':
                return Double.toString(n1 - n2);
            case 'x':
                return Double.toString(n1 * n2);
            case '/':
                if (n2 == 0) {
                    return "e";
                } else {
                    return Double.toString(n1 / n2);
                }
            case '%':
                if ((n1 - Math.floor(n1)) != 0 || (n2 - Math.floor(n2)) != 0)
                    return "e";
                else
                    return Integer.toString((int) n1 % (int) n2);
            default:
                return "e";
        }

    }

    public String calcOnePar(String sign, double n1) {
        if (sign.equals("sqrt")) {
            return Double.toString(n1 * n1);
        } else if (sign.equals("1/x")) {
            if (n1 == 0)
                return "e";
            else
                return Double.toString(1 / n1);
        } else if (sign.equals("root")) {
            if (n1 < 0)
                return "e";
            else
                return Double.toString(Math.sqrt(n1));
        }

        else if (sign.equals("-ve"))
            return Double.toString(n1 * -1);
        else
            return "e";
    }

    @GetMapping("/")
    public String bi(@RequestParam String num1, @RequestParam String sign, @RequestParam String num2) {
        double n1 = Double.parseDouble(num1);
        double n2 = 0.0;
        String s = "";
        if (num2.length() == 0 || num1.charAt(num1.length() - 1) == '.' || num2.charAt(num2.length() - 1) == '.') {
            s = "e";
        } else if (!num2.equals("no")) {
            n2 = Double.parseDouble(num2);
            s = calcTwoPar(n1, n2, sign.charAt(0));
        } else {
            s = calcOnePar(sign, n1);
        }

        return s;
    }

}
