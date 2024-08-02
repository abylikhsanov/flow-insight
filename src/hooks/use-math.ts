import {useCallback, useState} from "react";
import * as math from 'mathjs';

export const useMath = () => {
    const [result, setResult] = useState(null);

    const performCalculation = useCallback((expression: string) => {
        try {
            const evalResult = math.evaluate(expression);
            setResult(evalResult);
        } catch (error) {
            console.error('Error evaluating expression:', error);
            setResult(null);
        }
    }, []);

    return { result, performCalculation, ...math };
}