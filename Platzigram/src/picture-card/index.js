var yoyo = require('yo-yo');
var translate = require('../Translate');

module.exports = function pictureCard(pic) {
    var el;
    function render(picture) {
        return yoyo `<div class="card ${picture.liked ? 'liked' : ''}">
                        <div class="card-image" ondblclick=${like.bind(null, !picture.liked)}>
                            <div id="timeline-pic-${picture.url}" class="like-doubleClick">
                                <img class="activator" src="${picture.url}"/>
                            </div>
                        </div>
                        <div class="card-content">
                            <a href="/${picture.user.username}" class="card-title ">
                                <img src="${picture.user.avatar}" class="avatar"/>
                                <span class="username">${picture.user.username}</span>
                            </a>
                            <small class="right time">${translate.date.format(picture.createdAt)}</small>
                            <p>
                                <a class="left" href="#" onclick=${like.bind(null, true)}><i class="far fa-heart" aria-hidden="true"></i></a>
                                <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fas fa-heart" aria-hidden="true"></i></a>
                                <span class="left likes">${translate.message('likes', {likes: picture.likes})}</span>
                            </p>
                        </div>
                    </div>`;
    }

    function like(liked) {
        pic.liked = liked;
        pic.likes += liked? 1 : -1;
        var newEl = render(pic);
        yoyo.update(el, newEl);
        if(liked) {
            document.getElementById(`timeline-pic-${pic.url}`).appendChild(yoyo`<i class="fas fa-heart" aria-hidden="true"></i>`);
        }
        return false;
    }

    el = render(pic);
    return el;
};