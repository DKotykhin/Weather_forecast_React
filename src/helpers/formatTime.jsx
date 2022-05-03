
import moment from "moment";

export const formatTime = (offset, time) => {
    return moment.unix(time).utc().add(offset, "seconds").format("LT");
};