window.app.factory('post', function postFactory() {
  var post = {};
  post.posts = [{
    author: 'Mike Dee',
    title: 'A Beautiful Waterfall',
    description: 'It is thought that the underwater waterfall the Denmark Strait cataract is the largest waterfall by all measures with a drop of 11,500 feet or 3,500 m and a flow rate exceeding 175 million cubic feet (5.0 million cubic meters) per second, making it 350 times as voluminous as the extinct Guaíra Falls on the border of Brazil and Paraguay, which was once thought to be the most voluminous waterfall on Earth.',
    image_url: 'http://rs255.pbsrc.com/albums/hh160/loewus9_photos/Waterfalls/1020Waterfall.jpg~c200',
    rating: 3,
    comments: [{name: 'Cersei Lannister', text: 'OMG IT\'S SO PRETTY!'},
  {name: 'Tywin Lannister', text: 'Yuck.  I hate water.  Even worse when it falls.'}],
    showComments: false,
    postComment: false,
  }, {
    author: 'Tywin Lannister',
    title: 'Butterflies',
    description: 'Butterflies are part of the class of insects in the order Lepidoptera, along with the moths. Adult butterflies have large, often brightly coloured wings, and conspicuous, fluttering flight. The group comprises the large superfamily Papilionoidea, along with two smaller groups, the skippers (superfamily Hesperioidea) and the moth-butterflies (superfamily Hedyloidea). Butterfly fossils date to the Palaeocene, about 56 million years ago.',
    image_url: 'http://72.18.138.147/~san1ty76/wp-content/uploads/2010/11/butterfly-200x200.jpg',
    rating: 5,
    comments: [],
    showComments: false,
    postComment: false,
  }];
  post.reverse = true;
  post.showSubmit = false;
  post.addPost = function() {
    post.posts.push({
      author: post.author,
      title: post.title,
      description: post.description,
      image_url: post.image_url,
      rating: 0,
      comments: [],
    });
    post.author = '';
    post.title = '';
    post.description = '';
    post.image_url = '';
    post.showSubmit = false;
  };
  post.addComment = function(name, text, postObj) {
    var index = post.posts.indexOf(postObj);
    post.posts[index].comments.push({
      name: name,
      text: text
    });
    post.name = '';
    post.text = '';
    postObj.postComment = false;
    postObj.showComments = true;
  };
  post.get = function() {
    return post.posts;
  };
  post.upVote = function(postObj) {
    var index = post.posts.indexOf(postObj);
    post.posts[index].rating++;
  };
  post.downVote = function(postObj) {
    var index = post.posts.indexOf(postObj);
    post.posts[index].rating--;
  };
  post.sort = function(sortType) {
    return sortType;
  };
  return post;
});
