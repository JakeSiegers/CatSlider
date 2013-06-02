/**
* CatSlider.js
*
* CatSlider is a super simple mootools-based javascript plug-in that makes it extremely simple
* to make a quick, full-screen slide-show. It looks beautiful on almost any screen (that's normal sized), 
* and also looks nice boxed inside a website.
*
* Copyright 2013 Jake Siegers
*
* Released under the MIT License. You're free to do whatever you want with it :3
* http://opensource.org/licenses/mit-license.php
*
* ------------------------------------------------
* author: Jake Siegers
* version: 0.1.1 
* source: https://github.com/JakeSiegers/CatSlider
*/

var CatSlider = new Class({
	initialize: function(imageArray){
	
		this.theWidth = 500;
		this.theHeight = 500;
		this.slidePos = 1;
		this.slides = null;
		this.slidesLength = 0;
		this.images=imageArray;
		this.checkLoadPer=0;
		this.nextSlidePer=0;
		
		this.updateWindowSize();
		this.loadHTML();
		this.getSlides();
		this.startPeriodicals()
		this.updateSlideSizes()
	}
	,loadHTML: function(){
		//Generate the slide's HTML. Puts each image url in the array in it's own image & div tag.
		var CatSliderSlidesHtml = "";
		for(var i=0;i<this.images.length;i++){
			CatSliderSlidesHtml+='<div id="CatSliderSlide" class="CatSliderSlide"><img class="CatSliderSlideImg" src="'+this.images[i]+'"/></div>';
		}
		//load up the generated HTML into the previously 
		$('CatSliderSlides').set({html: CatSliderSlidesHtml});
	}
	,startPeriodicals: function(){
		//Start the periodicals that change slide and keep track of image loading
		this.checkLoadPer=this.checkLoad.periodical(2000,this);
		if(this.slidesLength>1){		
			this.nextSlidePer=this.nextSlide.periodical(5000,this);
		}
	}
	,stopPeriodicals: function(){
		//Stops the periodicals
		$clear(this.checkLoadPer);
		$clear(this.nextSlidePer);
	}
	,updateSlideSizes: function(){
		//Looping through all the slides to adjust padding to fit to screen
		this.stopPeriodicals() //Stop timed animations here... otherwise they could stop our resize animations below. 
		//set sizes for CatSliderBorder - This div has it's overflow hidden, which hides the scrollbar
		$('CatSliderBorder').set({style: 'height:'+(this.theHeight)+'px'});
		
		$(document.body).getElements('img').set({height: (this.theWidth*0.80)+'px',height: (this.theHeight*0.80)+'px'});
		
		for(var i=0;i<this.slidesLength;i++){
			this.slides[i].set('morph', {duration: 'long', transition: Fx.Transitions.Cubic.easeInOut});
			this.slides[i].morph({
				'height' : (this.theHeight*0.80)+'px',
				'margin-top' : (this.theHeight*0.10)+'px',
				'margin-bottom' : (this.theHeight*0.20)+'px'
			});
		}
		this.startPeriodicals() //resume animations
	}
	,updateWindowSize: function(){
		//Lets go get the window height! We want to fill our real estate, don't we?
		if (window.innerWidth){this.theWidth=window.innerWidth;} 
		else{this.theWidth=document.documentElement.clientWidth;} //old ie width

		if (window.innerHeight){this.theHeight=window.innerHeight;}
		else{this.theHeight=document.documentElement.clientHeight;} //old ie height
	}
	,getSlides: function(){
		//Get all the current slides on the page and update the slide count.
		//Generate an array of all the "Slides" i.e - every div that is part of the "slide" class.
		this.slides = $$('.CatSliderSlide');
		//Calculate the length of the new slides array
		this.slidesLength = this.slides.length;
	}
	,nextSlide: (function(){
		var slideHeight = parseInt(this.slides[0].getStyle('height'))+parseInt(this.slides[0].getStyle('margin-bottom'))+parseInt(this.slides[0].getStyle('border-top'))+parseInt(this.slides[0].getStyle('border-bottom'));
		var slidePx=this.slidePos*(slideHeight);
		
		$('CatSliderSlides').set('morph', {duration: 'long', transition: Fx.Transitions.Expo.easeInOut});
		if(this.slidePos==0){
			$('CatSliderSlides').set('morph', {duration: 'long', transition: Fx.Transitions.Elastic.easeInOut});
		}
		$('CatSliderSlides').morph({
			'margin-top' : '-'+slidePx+'px'
		});
		
		this.slidePos+=1;
		if(this.slidePos==this.slides.length){
			this.slidePos=0;
		}
	})
	,checkLoad: function(){
		for(var i=0;i<this.slidesLength;i++){
			this.slides[i].set('morph', {duration: 'long', transition: Fx.Transitions.Expo.easeInOut});
			this.slides[i].morph({
				'width' : (this.slides[i].getElements('img')[0].width)+'px'
			});
		}
	}
});

