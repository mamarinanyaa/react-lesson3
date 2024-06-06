import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      buttonText: 'Угадать',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      count: this.state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: 'Введённое число больше загаданного',
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: 'Введённое число меньше загаданного',
          userNumber: '',
        };
      }
      switch (state.buttonText) {
        case 'Угадать':
          return {
            result: `Вы угадали! Это число ${state.userNumber}.
            Количество попыток: ${state.count}`,
            buttonText: 'Сыграть еще',
          };
        case 'Сыграть еще':
          return {
            result: 'Результат',
            userNumber: '',
            randomNumber:
              Math.floor(Math.random() * this.props.max - this.props.min) +
              this.props.min,
            count: 0,
            buttonText: 'Угадать',
          };
      }
    });
  };
  handleChange = (e) => {
    this.setState((state, props) => {
      console.log(state, props);
      return {
        userNumber: e.target.value
      };
    });
  };
  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}/>
          <button className={style.btn}>{this.state.buttonText}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
