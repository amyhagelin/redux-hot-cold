import { 
	NEW_GAME, 
	newGame, 
	MAKE_GUESS, 
	makeGuess, 
	TOGGLE_INFO_MODAL, 
	toggleInfoModal
} from './actions';

import reducer from './reducer';

describe('reducer', () => {

    describe('newGame', () => {
    	it('resets to initial state and sets new correct answer', () => {
    		let state = {
    			correctAnswer: ''
    		};
    		state = reducer(state, newGame());
    		expect(state.correctAnswer).not.toEqual('');
    		expect(state.guesses).toEqual([]);
    	});
    });

	describe('toggleInfoModal', () => {

		it('toggles from opened to closed', () => {
			const initialState = {
				showInfoModal: true
			};
			const finalState = reducer(initialState, toggleInfoModal());
			expect(finalState).toEqual({showInfoModal: false});
		});

	});

	describe('Make Guess', () => {
		it('shows an error message when guess is NAN', () => {
			const initialState = {};
			const finalState = reducer(initialState, makeGuess({guess: "jk"}));
			expect(finalState).toEqual({feedback: 'Please enter a valid number'});
		})

		it('shows the correct message based on guess', () => {
			let state = {
				guesses: [],
				correctAnswer: 50
			}
			state = reducer(state, makeGuess(51));
			expect(state.feedback).toEqual('You\'re Hot!');
			state = reducer(state, makeGuess(65));
			expect(state.feedback).toEqual('You\'re Warm');
			state = reducer(state, makeGuess(90));
			expect(state.feedback).toEqual('You\'re Cold...');
			state = reducer(state, makeGuess(100));
			expect(state.feedback).toEqual('You\'re Ice Cold...');
			state = reducer(state, makeGuess(50));
			expect(state.feedback).toEqual('You got it!');

			expect(state.guesses).toEqual([51, 65, 90, 100, 50]);
		})
	})

})