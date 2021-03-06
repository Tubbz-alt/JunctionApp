import React, { useMemo } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
} from '@material-ui/core'
import { sortBy } from 'lodash-es'
import moment from 'moment'
import MiscUtils from 'utils/misc'
import TimelineDot from 'components/generic/TimelineDot'
import StepConnector from '@material-ui/core/StepConnector'

const useStyles = makeStyles(theme => ({
    root: {
        background: 'transparent',
    },
    borderContent: {
        borderColor: '#19DDEA',
        paddingTop: '8px',
        marginTop: '-9px',
        marginLeft: '6px',
        textTransform: 'uppercase',
    },
    date: {
        fontWeight: 'bold',
        paddingTop: '2px',
        fontSize: '18px',
    },
    label: {
        marginTop: '-9px',
    },
}))

const ColorlibConnector = withStyles({
    root: {
        marginLeft: '6px',
        paddingBottom: 0,
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#19DDEA',

        borderRadius: 1,
    },
    lineVertical: {
        borderColor: '#19DDEA',
        padding: 0,

        borderRadius: 1,
    },
})(StepConnector)

const EventTimeline = ({ event }) => {
    const classes = useStyles()
    const timelineItems = useMemo(() => {
        const items = [
            {
                date: moment(event.registrationStartTime).format('MMM D'),
                dateValue: moment(event.registrationStartTime).unix(),
                completed: moment(event.registrationStartTime).isBefore(),
                title: 'Application period begins',
                active: true,
            },
            {
                date: moment(event.registrationEndTime).format('MMM D'),
                dateValue: moment(event.registrationEndTime).unix(),
                completed: moment(event.registrationEndTime).isBefore(),
                title: 'Application period ends',
                active: true,
            },
            {
                date: MiscUtils.formatPDFDateInterval(
                    event.startTime,
                    event.endTime,
                ),
                dateValue: moment(event.startTime).unix(),
                completed: moment(event.endTime).isBefore(),
                title: event.name,
                active: true,
            },
        ]

        const sorted = sortBy(items, 'dateValue')

        return sorted
    }, [
        event.endTime,
        event.name,
        event.registrationEndTime,
        event.registrationStartTime,
        event.startTime,
    ])

    return (
        <Stepper
            className={classes.root}
            activeStep={0}
            orientation="vertical"
            connector={<ColorlibConnector />}
        >
            {timelineItems.map(item => (
                <Step
                    key={item.date + item.title}
                    active={item.active}
                    completed={item.completed}
                    expanded
                >
                    <StepLabel
                        StepIconComponent={TimelineDot}
                        className={classes.label}
                    >
                        <Typography variant="button" className={classes.date}>
                            {item.date}
                        </Typography>
                    </StepLabel>
                    <StepContent className={classes.borderContent}>
                        <Typography variant="subtitle2">
                            {item.title}
                        </Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}

export default EventTimeline
