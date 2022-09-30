import React,{ useEffect, useState } from 'react' ;

import { useNavigate } from 'react-router-dom';

import { useWalletInfo } from '../../../contexts/WalletContext.js';

import { connect } from 'react-redux' ;
import { InitUploadReducer } from '../../../redux/actions/upload.js';
import PropTypes from 'prop-types';

import UploadCheckOut from './UploadCheckOut.js';
import UploadSolsVideo from './UploadSolsVideo.js';
import PriceConfig from './PriceConfig.js';
import LegendaryPrice from './LegendaryPrice.js';
import RarePrice from './RarePrice.js';
import BundlePrice from './BundlePrice.js' ;
import FreePrice from './FreePrice.js';

const UploadScreen = (props) => {
    const navigate = useNavigate() 

    const {
        web3Provider
    } = useWalletInfo() ;

    const {
        InitUploadReducer
    } = props ;

    const [ uploadStep, setUploadStep ] = useState('sols-video') ;

    const handleChangeUploadStep = (step) => {
        setUploadStep(step) ;
    }

    useEffect(() => {
        if(!web3Provider) {
            navigate('/solstice/setting-screen') ;
        }
        return () => {
            InitUploadReducer() ;
        }
    }, []) ;

    return (
        <>
            {
                uploadStep === 'sols-video' && <UploadSolsVideo 
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'price-config' && <PriceConfig 
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'legendary-price' && <LegendaryPrice 
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'rare-price' && <RarePrice 
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'bundle-price' && <BundlePrice
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'free-price' && <FreePrice
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {/* {
                uploadStep === 'integration-detail' && <IntegrationDetail 
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
            {
                uploadStep === 'integration-content' && <IntegrationContent
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            } */}
            {
                uploadStep === 'product-checkout' && <UploadCheckOut
                    handleChangeUploadStep={handleChangeUploadStep}
                />
            }
        </>
    )
}
UploadScreen.propTypes = {
    InitUploadReducer : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    InitUploadReducer
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen) ;

