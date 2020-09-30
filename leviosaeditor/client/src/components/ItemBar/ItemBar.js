import React from 'react'
import './ItemBar.css'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


 class ItemBar extends React.Component {
    selectText = () => {
        const input = document.getElementById('input');
        input.focus();
        input.setSelectionRange(2, 5);
    }
     toggleBold = () => {
         var newDiv = document.createElement("b");
         // et lui donne un peu de contenu
         var newContent = document.createTextNode('');
         // ajoute le nœud texte au nouveau div créé
         newDiv.appendChild(newContent);

         // ajoute le nouvel élément créé et son contenu dans le DOM
         var currentDiv = document.getElementById('div1');
         document.body.insertBefore(newDiv, currentDiv);
     }
    toggleItalic = () => {

    }
    toggleUnderline = () => {
    }

    render () {

        return(
            <div>
                <div id="items-bar" >
                    <Button id="button" onClick={this.toggleBold()}>B</Button>
                    <Button onClick={this.toggleItalic}>I</Button>
                    <Button onClick={this.toggleUnderline}>U</Button>
                    <Button startIcon={<CloudUploadIcon />}/>
                </div>
            </div>
        )
    }
 }
 export default ItemBar
