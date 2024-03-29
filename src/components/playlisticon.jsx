import React, { Component } from 'react';
import { getThumbnail } from '../scripts/API'
import { Link } from 'react-router-dom';
import emptyAlbum from '../img/misc/emptyalbum.png'
const datejs = require('datejs')

class PlaylistIcon extends Component {
    state = { 
        images : [],
        isLoading: true
     }

    async componentDidMount(){
        let images = []

        const thumbnailObj = await getThumbnail(this.props.playlistDate)

        for (const key in thumbnailObj) {
            if (thumbnailObj.hasOwnProperty(key)) {
                const element = thumbnailObj[key];
                images.push(element.url)
            }
        }
        if (images.length < 4){
            let needed = 4 - images.length
            for (let index = 0; index < needed; index++) {
                images.push("none")
            }
        }
        this.setState({ images, isLoading: false })
    }

    render() {
        let startDate = new Date(this.props.playlistDate);
        startDate = startDate.add(1).day()
        let endDate = new Date(startDate)
        endDate = endDate.add(6).day()

        var now = new Date();

        let current = false

        if(endDate >= now){
            current = true
        }

        const linkTarget = "/music/"+this.props.playlistDate

        return (
            this.state.isLoading ? <></> :
            <Link to={linkTarget} className="playlistIcon">
                <div className="albumGrid">
                    {this.state.images.map((image, index) => {
                        index = index+1;

                        let imgStyle = {}
                        
                        if(image !== "none"){
                            imgStyle = {
                                backgroundImage: 'url('+image+')'
                            }
                        }
                        else{
                            imgStyle = {
                                backgroundImage: 'url('+emptyAlbum+')'
                            }
                        }

                        let element = <div style = {imgStyle} alt = "album art" key={startDate.toString("MMM dd, yyyy")+"art"+index}></div>
                        
                        return element
                    }) }
                </div>
                {current ? 
                <div className="dateIndicator">
                    This Week
                </div>: 
                <div className="dateIndicator">
                    {startDate.toString("MMM dd")} - {endDate.toString("MMM dd")}
                </div>
                }
            </Link>
         );
    }
}
 
export default PlaylistIcon;