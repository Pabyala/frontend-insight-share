import { format, formatDistanceToNow, parseISO } from 'date-fns';

interface TimeAgoPostProps {
    timeStamp: string | undefined;
}

export default function TimeAgoPost({ timeStamp }: TimeAgoPostProps) {
    let timeAgo = '';
    if (timeStamp) {
        const date = parseISO(timeStamp);
        const now = new Date();
        const daysDifference = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

        // ff the post is less than 1 day old, show "x minutes/hours ago"
        if (daysDifference < 1) {
            timeAgo = `${formatDistanceToNow(date, { addSuffix: true })}`;
        } else {
            // otherwise, show the exact date in "dd MMM" format
            timeAgo = format(date, 'dd MMM');
        }
    }
    return (
        <span title={timeAgo}>
            <i>{timeAgo}</i>
        </span>
    )
}