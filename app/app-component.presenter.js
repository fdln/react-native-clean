export default class AppComponentPresenter {
	dispatch = null;

	constructor(dispatch) {
		this.dispatch = dispatch;
	}

	load() {
		this.dispatch({type: 'NAVIGATION'})
	}

}