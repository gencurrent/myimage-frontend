import React from 'react';

import { v4 as uuidv4 } from 'uuid';

class DragAndDrop extends React.Component {

    constructor(props){
        super(props);
        this.dropRef = React.createRef();
        this.state = {
            dragging: false
        }
        this.htmlElementUuid = uuidv4();
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          this.setState({dragging: true});
        }
    }
    
    handleDragOut = (e) => {
        console.log(`Dragging out`);
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter > 0) return
        this.setState({dragging: false});
    }
    
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
        if (e.dataTransfer.files && e.dataTransfer.files){
            const reader = new FileReader();
            console.log('e.dataTransfer.files[0] = ', e.dataTransfer.files[0])
            reader.addEventListener('load', () =>
                this.props.handleDrop(reader.result, e.dataTransfer.files[0])
            );
            reader.readAsDataURL(e.dataTransfer.files[0]);
            this.dragCounter = 0;
        }
    }
    handleImageSelect = e => {
        e.preventDefault();
        this.setState({dragging: false});
        if (e.target && e.target.files) {
            let files = e.target.files;
            console.log(`DragAndDrop -> Handling image drop`, files);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.props.handleDrop(reader.result, files[0]);
            });
            reader.readAsDataURL(files[0]);
            this.dragCounter = 0;
        }
    }

    componentDidMount(){
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragout', this.handleDragOut);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
        this.dragCounter = 0;
    }

    componentWillUnmount(){
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragout', this.handleDragOut)
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render(){
        const {className} = this.props || '';
        return (
            <div 
                className={`file-upload-box col-lg-8 col-sm-12 d-flex ${className}`}
                ref={this.dropRef}>
                {this.state.dragging &&
                <div className='file-upload-box_when_dropping'
                >
                    <div 
                    style={{
                        position: 'relative',
                        top: '50%',
                        right: 0,
                        left: 0,
                        textAlign: 'center',
                        color: 'grey',
                        fontSize: 36
                    }}
                    >
                    <div>Drop here :)</div>
                    </div>
                </div>
                }
                <label className="btn btn-primary btn-file mx-auto my-auto" htmlFor={this.htmlElementUuid}>
                    Browse <input
                        className='select-image-input'
                        type="file"
                        id={this.htmlElementUuid}
                        accept=".jpg,.jpeg,.gif,.png"
                        // style={{ display: "none" }}
                        onChange={this.handleImageSelect}
                        hidden
                    />
                </label>

                {/* <label for={this.htmlElementUuid}>Choose an image</label> */}
                {/* {this.props.children} */}
            </div>
        )
    }
};



export default DragAndDrop;