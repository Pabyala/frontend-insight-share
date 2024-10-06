import React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 7,
        // border: `2px solid ${theme.palette.background.paper}`,
        // padding: '0',
    },
}));

export default function FollowersIcon() {
  return (
    <IconButton aria-label="following">
            <StyledBadge
                badgeContent={4}
                color="secondary"
            >
                <PeopleAltIcon className='' />
            </StyledBadge>
        </IconButton>
  )
}
