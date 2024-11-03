import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "src/entities/User";
import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {authReducer} from "src/entities/Auth";
import {roleReducer} from "src/entities/Role";
import {countryReducer} from "src/entities/Country";
import {genreReducer} from "src/entities/Genre";
import {actorReducer} from "src/entities/Actor";
import {subscriptionReducer} from "src/entities/Subscription";
import {mediaContentReducer} from "src/entities/MediaContent";
import {seriesReducer} from "src/entities/Series";
import {serieSeasonReducer} from "src/entities/SerieSeason";
import {seasonEpisodeReducer} from "src/entities/SeasonEpisode";
import {pageSectionReducer} from "src/entities/PageSection";
import {subscriptionRequestReducer} from "src/entities/SubscriptionRequest";
import {socialLinkReducer} from "src/entities/SocialLink";

export function createReduxStore(initialState: StateSchema) {
    const rootReducers = {
        user: userReducer,
        role: roleReducer,
        auth: authReducer,
        country: countryReducer,
        genre: genreReducer,
        actor: actorReducer,
        subscription: subscriptionReducer,
        mediaContent: mediaContentReducer,
        series: seriesReducer,
        serieSeason: serieSeasonReducer,
        seasonEpisode: seasonEpisodeReducer,
        pageSection: pageSectionReducer,
        subscriptionRequest: subscriptionRequestReducer,
        socialLink: socialLinkReducer,
    }

    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
