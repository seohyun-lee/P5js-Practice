let pictures = []; // 그림을 저장할 배열
let squares = [];
let bgcolor = 0;

function setup() {
    createCanvas(1200, 600);
    background(bgcolor);
    stroke(bgcolor);
    strokeWeight(3);
}

function draw() {
    for (let i = 0; i < pictures.length; i++) {
        let picture = pictures[i];

        // 시간 체크
        if (millis() - picture.startTime >= 4000) { // 시간이 지났으면
            // console.log("pop");
            fill(bgcolor);
            circle(picture.x, picture.y, picture.size);
            pictures.splice(i, 1); // 배열에서 그림 제거 
            i--; // 배열 인덱스 조정
        } else {
            picture.y = picture.y - 2.0;
            picture.drawCircle();
        }
    }
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];

        // 시간 체크
        if (millis() - square.startTime >= 4500) { // 시간이 지났으면
            // console.log("pop");
            fill(bgcolor);
            rect(square.x, square.y, width, square.size);
            squares.splice(i, 1); // 배열에서 그림 제거 
            i--; // 배열 인덱스 조정
        } else {
            square.y = square.y - 2.0;
            square.drawSquare();
        }
    }
        // 색깔이 그라데이션으로 페이드아웃되면 좋을 텐데
        /*let initcolor = pictures[i].color;
        if (millis() - picture.startTime <= 2000) {
            console.log("pop");
            const interA = // 여기서 보간법 쓰면 될 거 같은데 잘 모르겠다
            pictures[i].color = fill(interA);
            picture.drawCircle();
        }
        if (initcolor == 220) {
            pictures.splice(i, 1); // 배열에서 그림 제거
            i--; // 배열 인덱스 조정
        }*/
}

function keyPressed() {
    let keyIndex = -1;
    if (key >= 'a' && key <= 'z') {
        keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    if (key == ' ') {
        console.log("pop");
        let picture = createSquare(0, 500, 10);
        squares.push(picture);
        picture.drawSquare();
    }
    else if (keyIndex === -1) {
        // 글자 자판이 아닐 경우
    } else {
        // 글자 자판일 경우, 랜덤한 색상의 비눗방울
        // let x = random(width);
        // let y = random(height);
        let size = random(8, 180);
        let randFill_r = Math.floor(Math.random() * 255 + 1);
        let randFill_g = Math.floor(Math.random() * 255 + 1);
        randFill_b = Math.floor(Math.random() * 255 + 1);
        // keyIndex를 바탕으로 가로 위치
        let picture = createPicture(40 + keyIndex*45, 520, size, randFill_r, randFill_g, randFill_b); // 그림 생성 함수 호출
        pictures.push(picture); // 배열에 그림 추가
        picture.drawCircle();
    }
}

// circle 생성 함수
function createPicture(x, y, size, randFill_r, randFill_g, randFill_b) {
    let picture = {
        x: x,
        y: y,
        size: size,
        randFill_r: randFill_r,
        randFill_g: randFill_g,
        randFill_b: randFill_b,
        startTime: millis(), // 생성 시간 기록
        drawCircle: function () {
            // 그림 그리기
            fill(randFill_r, randFill_g, randFill_b);
            circle(this.x, this.y, this.size);
        }
    };

    return picture;
}

// square 생성 함수
function createSquare(x, y, size) {
    let picture = {
        x: x,
        y: y,
        size: size,
        startTime: millis(), // 생성 시간 기록
        drawSquare: function() {
            fill(255);
            rect(this.x, this.y, width, size);
        }
    };

    return picture;
}