let b = document.body,
    c = document.createElement('canvas');

b.appendChild(c);

let a = c.getContext('2d'),
    e = [],
    h = [],
    O = c.width = innerWidth,
    Q = c.height = innerHeight,
    v = 32,
    M = Math,
    R = M.random,
    F = M.floor,
    C = M.cos,
    Y = 6.3,
    i = 0, H, S, B, f, k;

for (i; i < Y; i += .2) {
    h.push([
        O / 2 + 180 * M.pow(M.sin(i), 3),
        Q / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
    ])
}

i = 0;

while (i < v) {

    x = R() * O;
    y = R() * Q;
    H = 0;
    S = R() * 40 + 60;
    B = R() * 60 + 20;
    f = [];
    k = 0;

    while (k < v) {
        f[k++] = {
            x: x,
            y: y,
            X: 0,
            Y: 0,
            R: (1 - k / v) + 1,
            S: R() + 1,
            q: F(R() * v),
            D: i % 2 * 2 - 1,
            F: R() * .2 + .7,
            f: "hsla(" + F(H) + "," + F(S) + "%," + F(B) + "%,.3)"
        }
    }

    e[i++] = f;
}

function render(p) {
    a.fillStyle = p.f;
    a.beginPath();
    a.arc(p.x, p.y, p.R, 0, Y, 1);
    a.closePath();
    a.fill();
}

function loop() {

    a.fillStyle = "rgba(0,0,0,.2)";
    a.fillRect(0, 0, O, Q);

    let i = v, f, u, q, D, E, G;

    while (i--) {
        f = e[i];
        u = f[0];
        q = h[u.q];
        D = u.x - q[0];
        E = u.y - q[1];
        G = M.sqrt((D * D) + (E * E));

        if (G < 10) {
            if (R() > .95) {
                u.q = F(R() * v);
            } else {
                if (R() > .99) u.D *= -1;
                u.q += u.D;
                u.q %= v;
                if (u.q < 0) u.q += v;
            }
        }

        u.X += -D / G * u.S;
        u.Y += -E / G * u.S;

        u.x += u.X;
        u.y += u.Y;

        render(u);

        u.X *= u.F;
        u.Y *= u.F;

        let k = 0, T, N;

        while (k < v - 1) {
            T = f[k];
            N = f[++k];

            N.x -= (N.x - T.x) * .7;
            N.y -= (N.y - T.y) * .7;

            render(N);
        }
    }
}

(function doit() {
    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    window.requestAnimationFrame(doit);
    loop();
})();
