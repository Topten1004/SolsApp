import * as React from 'react' ;

import { connect } from 'react-redux';
import { UpdateNotify } from '../../redux/actions/notify';
import PropTypes from 'prop-types' ;

import SpeakerImage from '../../assets/common/Speaker.png' ;
import CloseImage from '../../assets/common/Close.png' ;

import { getCookie, getUnit, getUuid } from '../../utils/Helper';

import  {
    Box
} from '@mui/material' ;

import { useTheme } from '@mui/styles';

import { useStyles } from './StylesDiv/Notifications.styles' ;

const NotificationList = (props) => {

    const classes = useStyles(props) ;
    
    const {
        notifysList,
        isOpen
    } = props ;

    const handleDeleteNotify = async (id) => {
        await UpdateNotify(null, id) ;
    }

    return (
        <Box className={isOpen ? classes.rootExpand : classes.rootLess}>
            {
                notifysList.map(([id, item]) => {
                    return <Box className={classes.notifyDiv} key={id}>
                        <img src={SpeakerImage} width={30} height={30}/>
                        <Box>
                            {
                                item.type === 'legendary' && (
                                    item.buyer.role === 'reseller' ? `${item.buyer?.account_name} bought ${item.product}(NFT) with ${item.price} ${getUnit(item.unit)} at ${item.purchased_at}`
                                    : `${item.buyer?.account_name} bought ${item.product}(Product) with ${item.price} ${getUnit(item.unit)} at ${item.purchased_at}`
                                )
                            }
                            {
                                item.type === 'free' && `${item.buyer?.account_name} free offer ${item.product} at ${item.purchased_at}`
                            }
                            {
                                item.type === 'bundle' && `${item.buyer?.account_name} bought ${item.product} with ${item.price} ${getUnit(item.unit)} at ${item.purchased_at}`
                            }
                            {
                                item.type === 'rare' &&  `${item.buyer?.account_name} placed bid about ${item.product} with ${item.price} ${getUnit(item.unit)} at ${item.purchased_at}`
                            }
                        </Box>
                        <Box className={classes.closeDiv} onClick={() => handleDeleteNotify(id)}>
                            <img src={CloseImage} />
                        </Box>
                    </Box>
                })
            }
        </Box>
    )
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps) (NotificationList) ;