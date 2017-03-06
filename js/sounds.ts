class Sounds {
    private holderDom = document.querySelector(".js-sounds");
    private startDom = this.holderDom.querySelector(".js-sound-start");
    private tankMoveDom = this.holderDom.querySelector(".js-sound-tank-move");
    private tankFireDom = this.holderDom.querySelector(".js-sound-tank-fire");
    private tankExploreDom = this.holderDom.querySelector(".js-sound-tank-explore");
    private bulletExploreDom = this.holderDom.querySelector(".js-sound-bullet-explore");

    public start() {
        (<HTMLMediaElement>this.startDom).play();        
    }

    public tankMove() {
        let elem = <HTMLMediaElement>this.tankMoveDom;
        elem.currentTime = 0;
        elem.play();      
    }

    public tankExplore() {
        let elem = <HTMLMediaElement>this.tankExploreDom;
        elem.currentTime = 0;
        elem.play();
    }

    public bulletExplore() {
        let elem = <HTMLMediaElement>this.bulletExploreDom;
        elem.currentTime = 0;
        elem.play();    
    }

    public tankFiree() {
        let elem = <HTMLMediaElement>this.tankFireDom;
        elem.currentTime = 0;
        elem.play();    
    }
}

export default new Sounds;