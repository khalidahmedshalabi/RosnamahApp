import { AsyncStorage, Platform } from 'react-native';
import {
	AdMobInterstitial
} from 'react-native-admob'

export const InitAdMobInterstitial = () => {
	AdMobInterstitial.setAdUnitID(
		Platform.OS === 'ios' ? 'ca-app-pub-3940256099942544/1033173712' : 'ca-app-pub-3940256099942544/1033173712'
	);
	//AdMobInterstitial.setTestDeviceID('EMULATOR');
}

function dateDiffInDays(date1, date2) {
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

	return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
}

export const shouldShowAdMobInterstitial = () => {
	AsyncStorage.getItem('AdMobInterstitial_last_date_viewed').then((last_date_viewed) => {
		if (!last_date_viewed) {
			AsyncStorage.setItem('AdMobInterstitial_last_date_viewed', new Date().toString());
		}
		else {
			const dateNow = new Date()
			if (dateDiffInDays(new Date(last_date_viewed), dateNow) >= 7) {
				AdMobInterstitial.requestAd(AdMobInterstitial.showAd);
				AsyncStorage.setItem('AdMobInterstitial_last_date_viewed', dateNow.toString());
			}
		}
	})
}

export default {
	shouldShowAdMobInterstitial,
	InitAdMobInterstitial
}