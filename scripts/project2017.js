// YOUR NAME HERE
 
// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;
var selledItems =0;


// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();
    

	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);



// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function (c) {
    
	var shop = document.getElementById("boutique");
	for(var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
//	input.max = MAX_QTY.toString();
    input.onchange = function(){
        if(parseFloat(document.getElementById(input.id).value)>9)
            document.getElementById(input.id).value = 9;
        if(document.getElementById(input.id).value>0 && document.getElementById(input.id).value<=9){
            document.getElementById(input.id.replace(inputIdKey,orderIdKey)).style.opacity=1;
            document.getElementById(input.id.replace(inputIdKey,orderIdKey)).disabled=false;

             
            return;
        }
       
        document.getElementById(input.id.replace(inputIdKey,orderIdKey)).disabled=true;
        document.getElementById(input.id.replace(inputIdKey,orderIdKey)).style.opacity=0.25;
      
        return;
        
    }
	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
    button.onclick=function(){
        //add product to the sellings
        var sellings = document.getElementById("achat");
        var Sellingsproduct = document.createElement("div");
        Sellingsproduct.className = "sellingProduct";
        Sellingsproduct.id = index+"-sellingProduct";
        
        var imgProduct = document.createElement("img");
        imgProduct.src = catalog[index].image;
        imgProduct.width = 20;
        imgProduct.className = "imgAchat";
        Sellingsproduct.appendChild(imgProduct);
        Sellingsproduct.appendChild(createBlock("div", catalog[index].description, "descriptionAchat"));
        
        
        
        var qte = document.getElementById(button.id.replace(orderIdKey,inputIdKey)).value;
        var prix = catalog[index].price;
        var montant = document.createElement("div");
        var newProd = true;
        for(i=0;i<selledItems;i++)
        {   
            if(document.getElementsByClassName("sellingProduct").item(i).id==Sellingsproduct.id)
            {
                var oldQte = document.getElementById(document.getElementsByClassName("sellingProduct").item(i).id+"Montant").innerHTML.split("x")[0];
                
                qte = parseFloat(oldQte) + parseFloat(qte);
                if(qte>9)
                    qte=9;

                document.getElementById(document.getElementsByClassName("sellingProduct").item(i).id+"Montant").innerHTML = qte +"x"+prix+"&euro;  <button class='retirer' style='margin-top: 10px;' id='"+Sellingsproduct.id+"Button' onclick='retirerProduct(this.id)'></button>";
                newProd=false;
               document.getElementById("montant").innerHTML= parseFloat(document.getElementById("montant").innerHTML)+(qte-oldQte)*prix;

                break;
            }
        }
        if(newProd){
            montant.id=index + "-sellingProductMontant";
            montant.innerHTML = qte +"x"+prix+"&euro;  <button class='retirer' style='margin-top: 10px;' id='"+Sellingsproduct.id+"Button' onclick='retirerProduct(this.id)'></button>";



            Sellingsproduct.appendChild(montant);
            sellings.appendChild(Sellingsproduct);
            selledItems++;
            document.getElementById("montant").innerHTML= parseFloat(document.getElementById("montant").innerHTML)+qte*prix;

        }
      
        
        document.getElementById(button.id.replace(orderIdKey,inputIdKey)).value=0;
        document.getElementById(button.id.replace(orderIdKey,inputIdKey)).onchange();
    };
    button.style.opacity = 0.25;
    button.disabled=true;
    // add control to control as its child
	control.appendChild(button);
	
	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (product) {
	// this is absolutely not the correct answer !
	// TODO 
    var imageDiv = document.createElement("figure");
    var productimage = document.createElement("img");
    productimage.src = product.image;
    imageDiv.className = "imgDiv";
    imageDiv.appendChild(productimage);
    
	//return createBlock("img", "...images/chaiseblanche.jpg");
    return imageDiv;
}
function retirerProduct(id){
    
    var prixQte = document.getElementById(id.replace("Button","Montant")).innerHTML.split("x");
   
    var price = prixQte[0]*prixQte[1].split("€")[0];
    document.getElementById("montant").innerHTML= parseFloat(document.getElementById("montant").innerHTML)-price;

    var idToDelete =id.replace("Button","");
    var elementToDelete =document.getElementById(idToDelete);
    elementToDelete.parentNode.removeChild(elementToDelete);
    
    selledItems--;

    
}
function filtrer(){
    var filterProd = document.getElementById("filter").value;
    var nbrProd = catalog.length;
    document.getElementById("boutique").innerHTML = "";
    var shop = document.getElementById("boutique");

   
    for(i=0;i<nbrProd;i++)
    {
        if(catalog[i].name.toUpperCase().includes(filterProd.toUpperCase()))
            shop.appendChild(createProduct(catalog[i], i));
	
    }
    if(filterProd==""){
        createShop();
        document.getElementById("filter").focus();

        
       
    }
    
}

$(document).ready(function(){
    
    function reloadJd(src){
        $('script[src^="data"]').remove();
        $('<script/>').attr('src',src).appendTo('head');
        
    }
    
    
    
$("#selectCat").change(function() { 
    $('div[class="produit"]').remove();
    $('div[class="sellingProduct"]').remove();
    document.getElementById("montant").innerHTML= 0;
    selledItems=0;
    var c = document.getElementById("selectCat").value;
    //document.getElementById("scriptSrc").src = "data/"+c+".js";
    reloadJd("data/"+c+".js")
    createShop(c);
});
})