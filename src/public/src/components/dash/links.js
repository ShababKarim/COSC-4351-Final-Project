import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth + 30
    },
    card: {
        backgroundColor: 'primary'
    },
    content: {
        textAlign: 'center'
    },
    page: {
        marginLeft: drawerWidth + 30,
        marginTop: 50
    }
}));

const Links = props => {
    const classes = useStyles();

    return (
        <div id="more" className={classes.page}>
            <div>
                <GridList cols={4} className={classes.page}>
                    {props.links.map(({ url, _id }) => {
                        return (
                            <GridListTile key={_id}>
                                <Card
                                    raised={true}
                                    style={{
                                        maxWidth: 250,
                                        backgroundColor: '#D32F2F',
                                        color: 'white'
                                    }}
                                >
                                    <CardContent className={classes.content}>
                                        <Typography variant="h5">
                                            {url}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="large"
                                            fullWidth
                                            style={{
                                                color: 'white'
                                            }}
                                        >
                                            <ArrowForwardIcon></ArrowForwardIcon>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </GridListTile>
                        );
                    })}
                </GridList>
            </div>
        </div>
    );
};

export default Links;
