import * as Webcam from "react-webcam";
import * as React from "react"
import Modal from 'react-responsive-modal';

interface IState {
	open: boolean,
	uploadFileList: any,
	authenticated: boolean,
	refCamera: any
}

export default class FaceUnlockActivity extends React.Component<any, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			open: false,
			uploadFileList: null,
			authenticated: false,
			refCamera: React.createRef()
		}     
    }

    render(){
        if (!this.state.authenticated){
            return(
                <Modal open={!this.state.authenticated} onClose={this.authenticate} closeOnOverlayClick={false} showCloseIcon={false} center={true}>
                    <div style={{textAlign: "center"}}>
                        <h3>Hello Admin, Please complete 2FA</h3>
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            ref={this.state.refCamera}
                            height="180px"
                            width="200px"
                        />
                        <div className="row nav-row">
                            <div className="btn btn-primary bottom-button" onClick={this.authenticate}>Login</div>
                        </div>
                    </div>
                </Modal>
            )
        } else {
            // Return nothing
            return("");
        }
    }

    private authenticate = () => {
        const screenshot = this.state.refCamera.current.getScreenshot();
		this.getFaceRecognitionResult(screenshot);
    }

    private getFaceRecognitionResult = (image: string) => {
        const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/ed26e7a6-b448-4610-a21b-e2eda6b8f831/image?iterationId=c02ebdbf-df5a-4367-ae54-cbac10915384"
		if (image === null) {
			return;
		}
		const base64 = require('base64-js');
		const base64content = image.split(";")[1].split(",")[1]
		const byteArray = base64.toByteArray(base64content);
		fetch(url, {
			body: byteArray,
			headers: {
                'cache-control': 'no-cache', 
                'Prediction-Key': 'cc3aa07bf0064534a211d11a7e7fb687', 
                'Content-Type': 'application/octet-stream'
                
            },
			method: 'POST'
		})
        .then((response: any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText)
            } else {
                response.json().then((json: any) => {
                    console.log(json.predictions[0].probability)
                    if (json.predictions[0].probability > 0.75){
                        this.setState({authenticated: true});
                        this.props.authenticated();
                    } else {
                        alert("Can not verify your face, please try again")
                    }
                })
            }
        })
    }
}