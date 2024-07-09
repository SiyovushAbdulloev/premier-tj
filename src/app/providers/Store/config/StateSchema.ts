import {UserSchema} from "src/entities/User/types";
import {AuthSchema} from "src/entities/Auth/types";
import {RoleSchema} from "src/entities/Role";
import {CountrySchema} from "src/entities/Country";
import {GenreSchema} from "src/entities/Genre";
import {ActorSchema} from "src/entities/Actor";
import {SubscriptionSchema} from "src/entities/Subscription";
import {MediaContentSchema} from "src/entities/MediaContent";
import {SeriesSchema} from "src/entities/Series";
import {SerieSeasonSchema} from "src/entities/SerieSeason";
import {SeasonEpisodeSchema} from "src/entities/SeasonEpisode";
import {PageSectionSchema} from "src/entities/PageSection";
import {SubscriptionRequestSchema} from "src/entities/SubscriptionRequest";

export interface StateSchema {
    user: UserSchema
    role: RoleSchema
    auth: AuthSchema
    country: CountrySchema
    genre: GenreSchema
    actor: ActorSchema
    subscription: SubscriptionSchema
    mediaContent: MediaContentSchema
    series: SeriesSchema
    serieSeason: SerieSeasonSchema
    seasonEpisode: SeasonEpisodeSchema
    pageSection: PageSectionSchema
    subscriptionRequest: SubscriptionRequestSchema
}
