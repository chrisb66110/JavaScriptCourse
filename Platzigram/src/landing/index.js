var yoyo = require('yo-yo');

module.exports = function landing(box)
{
    return yoyo`<div class="container landing">
      <div class="row">
        <div class="col s10 push-s1">
          <div class="row">
            <div class="col m5 hide-on-small-only">
              <img class="iphone" src="iphone.png" />
            </div>
            ${box}
          </div>
        </div>
      </div>
    </div>`;
};