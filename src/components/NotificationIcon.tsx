import React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 7,
        // border: `2px solid ${theme.palette.background.paper}`,
        // padding: '0',
    },
}));

export default function NotificationIcon() {
    return (
        <IconButton aria-label="notification">
            <StyledBadge
                badgeContent={4}
                color="secondary"
            >
                <NotificationsIcon className='text-white' />
            </StyledBadge>
        </IconButton>
    )
}
