import AppComponentPresenter from './app-component.presenter';
import SignInComponentPresenter from '../auth/sign-in/sign-in-presenter'
import FakeComponent from '../test/fake-component'
import ApiGateway from "../common/api-gateway";
import FakeStore from "../test/fake-store";

let fakeStore = null;
let fakeSignInComponent = null;
let fakeAppComponent = null;
let signInPresenter = null;
let appComponentPresenter = null;

beforeEach(() => {
	fakeStore = new FakeStore();
	fakeSignInComponent = new FakeComponent(fakeStore);
	fakeAppComponent = new FakeComponent(fakeStore);
	signInPresenter = new SignInComponentPresenter(fakeSignInComponent.dispatch);
	appComponentPresenter = new AppComponentPresenter(fakeAppComponent.dispatch);
});

it('should load initial drawer menu', async () => {
	expect(fakeAppComponent.props.drawerItems).toEqual(['Home', 'SignIn']);
});

it('should add protected item to drawer when user logs in', async () => {

	ApiGateway.prototype.save = () => {
		return Promise.resolve({
			"success": true,
			"message": "user signIn successful",
			"token": "123"
		});
	};

	await signInPresenter.signIn(fakeSignInComponent);

	appComponentPresenter.load();

	expect(fakeAppComponent.props.drawerItems).toEqual(['Home', 'SignIn', 'Books']);

});

it('should not add protected item to drawer when user logs in', async () => {

	ApiGateway.prototype.save = () => {
		return Promise.resolve({
			"success": false,
			"message": "user signIn failed"
		});
	};

	await signInPresenter.signIn(fakeSignInComponent);

	appComponentPresenter.load();

	expect(fakeAppComponent.props.drawerItems).toEqual(['Home', 'SignIn']);

});






