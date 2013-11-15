var youTubeImagePreview = {
  // youTubeImagePreview properties
  videoId: null,
  videoTitle: null,
  numberOfThumbnails: 1,
  backgroundJs: null,

  init: function(){
    // Load the background script object
    this.backgroundJs = chrome.extension.getBackgroundPage();
    if (!this.backgroundJs)
      return false;

    // Get and set the YouTube ID
    this.videoId = this.getYoutubeId();
    if (!this.videoId) window.close();

    this.videoTitle = this.getYoutubeTitle();

    this.drawTemplate();

    this.bindHighlightUrl();
    this.highlightText('urlText');

    return true;
  },

  getYoutubeId: function(){
    
    var bgJs = this.backgroundJs;

    // Try to find the YouTube Id from the URL
    var idMatches = bgJs.youtubeUrl.match(/[?&]v=([^&#]+)/);
    if (!!idMatches) return idMatches[1];

    return null;
  },

  getYoutubeTitle: function(){

    var bgJs = this.backgroundJs;

    // Try to get the name of the video through the page title
    // We don't want the trailing "YouTube" so remove that as well
    if (!!bgJs.youtubeTitle)
      return bgJs.youtubeTitle.replace(/ \- YouTube/,'');

    return 'This YouTube Video';
  },

  getThumbnailUrl: function(thumbnailNumber){

    if (!thumbnailNumber || thumbnailNumber>this.numberOfThumbnails)
      thumbnailNumber = 0;

    // return 'http://img.youtube.com/vi/'+this.videoId+'/'+thumbnailNumber+'.jpg';
    return 'http://img.youtube.com/vi/'+this.videoId+'/maxresdefault.jpg';
  },

  drawTemplate: function(){

    var thumbnailUrl = this.getThumbnailUrl();

    $('h3')
      .text(this.videoTitle);
    $('.thumbnail img')
      .attr('src',thumbnailUrl);
    $('.thumbnail a')
      .attr('href',thumbnailUrl);
    $('.thumbnail .url p')
      .text(thumbnailUrl);
  },

  bindHighlightUrl: function(){
    var highlightText = this.highlightText;
    $('.thumbnail .url p').click(function(){
      highlightText('urlText');
    });
  },

  // Scored from http://stackoverflow.com/a/987376
  highlightText: function(element){
    var text = document.getElementById(element);
    var selection = window.getSelection();
    selection.setBaseAndExtent(text, 0, text, 1);
  }
};

youTubeImagePreview.init();
