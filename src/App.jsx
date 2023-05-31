import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState();
	const [displayColor, setdisplayColor] = useState(false);

	const numbers = [
		{ value: '0', id: 1 },
		{ value: '1', id: 2 },
		{ value: '2', id: 3 },
		{ value: '3', id: 4 },
		{ value: '4', id: 5 },
		{ value: '5', id: 6 },
		{ value: '6', id: 7 },
		{ value: '7', id: 8 },
		{ value: '8', id: 9 },
		{ value: '9', id: 10 },
	];
	const onClickNumbers = (event) => {
		const number = event.target.value;
		if (value) {
			setValue(value + number);
			setdisplayColor(false);
		} else {
			setValue(number);
			setdisplayColor(false);
		}
	};
	const onClickOperators = (event) => {
		const operator = event.target.value;
		if (value) {
			console.log(value);
			const lastSymbol = value.slice(-1);
			if (!(lastSymbol === '+' && lastSymbol === '-')) {
				setValue(value + operator);
			}
			if (lastSymbol === '+' || lastSymbol === '-') {
				const newValue = value;
				setValue(newValue.slice(operator, -1) + operator);
			}
		}
	};

	const onClickClear = () => {
		setValue();
	};

	const onClickResult = () => {
		if (value && (value.includes('+') || value.includes('-'))) {
			const lastSymbol = value.slice(-1);
			if (lastSymbol === '+' || lastSymbol === '-') {
				const newValue = value;
				const stringWithoutSymbolOnEnd = newValue.slice(0, -1);
				setValue(String(eval(stringWithoutSymbolOnEnd)));
				setdisplayColor(true);
			} else {
				setValue(String(eval(value)));
				setdisplayColor(true);
			}
		}
	};
	return (
		<div className={styles.calculator}>
			<div className={displayColor ? styles.nonresult : styles.result}>
				{value}
			</div>
			<div className="styles.appButton">
				{numbers.map(({ value, id }) => (
					<button onClick={onClickNumbers} value={value} key={id}>
						{value}
					</button>
				))}
				<button onClick={onClickOperators} value={'+'}>
					+
				</button>
				<button onClick={onClickOperators} value={'-'}>
					-
				</button>
				<button onClick={onClickResult}>=</button>
				<button onClick={onClickClear}>C</button>
			</div>
		</div>
	);
};
