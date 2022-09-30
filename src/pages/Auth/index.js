import * as React from 'react' ;

import { connect } from 'react-redux' ;

import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';
import AccountForm from './AccountForm.js';
import SocialAndEmailForm from './SocialAndEmailForm.js';
import ImageSetForm from './ImageSetForm.js';
import ForgotForm from './ForgotForm.js';

const Auth = (props) => {

    const {
        isLogin
    } = props ;

    const [authStep, setAuthStep] = React.useState('signin') ;

    const handleChangeAuthStep = (step) => {
        setAuthStep(step) ;
    }
    
    React.useEffect(() => {
        if(isLogin) {
        }
    }, [isLogin]);


    React.useEffect(() => {
        return () => {
            // InitAuthReducer() ;
        }
    }, []) ; 

    return (
        <>
            {
                authStep === 'forgot' && <ForgotForm
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
            {
                authStep === 'signin' && <SignInForm 
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
            {
                authStep === 'signup' && <SignUpForm 
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
            {
                authStep === 'account' && <AccountForm 
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
            {
                authStep === 'social' && <SocialAndEmailForm 
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
            {
                authStep === 'imageset' && <ImageSetForm
                    handleChangeAuthStep={handleChangeAuthStep}
                />
            }
        </>
    )
}

const mapStateToProps = state => ({
    isLogin : state.auth.isLogin
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth) ;

