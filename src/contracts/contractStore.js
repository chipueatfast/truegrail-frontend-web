import { generateStore, EventActions } from 'drizzle';
import drizzleOptions from './drizzleOptions';

const ContractEventNotifier = store => next => action => {
    if (action.type === EventActions.EVENT_FIRED) {
        debugger
        console.log(action.event.event);
        switch (action.event.event) {
            case 'Issue': 
                console.log(action.event.returnValues);
            break;

            default:
                break;
        }
    }
    return next(action);
}

const appMiddlewares = [ContractEventNotifier];

export default generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false,  // enable ReduxDevTools!
})