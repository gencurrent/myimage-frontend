import React from 'react';


class DragAndDrop extends React.Component {

    constructor(props){
        super(props);
        this.dropRef = React.createRef();
        this.state = {
            dragging: false
        }
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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const reader = new FileReader();
            console.log('e.dataTransfer.files[0] = ', e.dataTransfer.files[0])
            reader.addEventListener('load', () =>
                this.props.handleDrop(reader.result, e.dataTransfer.files[0])
            );
            reader.readAsDataURL(e.dataTransfer.files[0]);
            this.dragCounter = 0;
        }
    }


    componentDidMount(){
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragout', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
        this.dragCounter = 0;
    }

    componentWillUnmount(){
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragout', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render(){
        return (
            <div 
                className='file-upload-box'
                ref={this.dropRef}>
                {this.state.dragging &&
                <div
                    style={{
                    border: 'dashed grey 4px',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    position: 'relative',
                    display: 'block',
                    top: 0,
                    bottom: 0,
                    left: 0, 
                    right: 0,
                    zIndex: 9999
                    }}
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
                {this.props.children}
            </div>
        )
    }
}

export default DragAndDrop;