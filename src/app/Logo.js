import View             from 'famous-creative/display/View';

//GL Components
const Color             = FamousPlatform.utilities.Color;
const DynamicGeometry   = FamousPlatform.webglGeometries.DynamicGeometry;
const Geometry          = FamousPlatform.webglGeometries.Geometry;
const GeometryHelper    = FamousPlatform.webglGeometries.GeometryHelper;
const OBJLoader         = FamousPlatform.webglGeometries.OBJLoader;

export class Logo extends View {
    constructor(node, options) {
        super(node, options);

        this.setAlign(0.5, .5, 0.5).setMountPoint(0.5, .5, 0.5).setOrigin(0.5, 0.5, 0.5);
        this.setSizeModeAbsolute().setAbsoluteSize(200, 200, 200);
        this.setPositionZ(500);

        this.parent = new View(this.addChild());
        this.quads  = new View(this.parent.addChild());
        this.quads.setOrigin(0.5, 0.5, 0.5);
        this.quads.setPositionZ(100);

        this.geometries = {};

        const names = ['B', 'M', 'W', 'outerRing', 'innerRing', 'cross', 'outsideCyl', 'insideCyl'];
        const quads = ['first', 'second', 'third', 'fourth'];

        names.forEach((name) => {
            this.geometries[name] = this.objFactory(this.parent.addChild(), name);
        });

        quads.forEach((name) => {
            this.geometries[name] = this.objFactory(this.quads.addChild(), name);
        });

        const color = {
            blue: '#54A9D4',
            white: '#F5F5F5',
            darkestGrey: '#222222',
            darkerGrey: '#444444',
            darkGrey: '#555555',
            gray: '#AAAAAA'
        };

        this.geometries.B.setBaseColor(new Color(color.white));
        this.geometries.M.setBaseColor(new Color(color.white));
        this.geometries.W.setBaseColor(new Color(color.white));
        this.geometries.first.setBaseColor(new Color(color.white));
        this.geometries.second.setBaseColor(new Color(color.blue));
        this.geometries.third.setBaseColor(new Color(color.white));
        this.geometries.fourth.setBaseColor(new Color(color.blue));
        this.geometries.insideCyl.setBaseColor(new Color(color.darkestGrey));
        this.geometries.outsideCyl.setBaseColor(new Color(color.darkerGrey));
        this.geometries.cross.setBaseColor(new Color(color.darkGrey));
        this.geometries.innerRing.setBaseColor(new Color(color.gray));
        this.geometries.outerRing.setBaseColor(new Color(color.gray));
    }

    objFactory(node, name) {
        let geo = new View(node);
        geo.setAlign(0.5, 0.5, 0.5).setMountPoint(0.5, 0.5, 0.5).setOrigin(0.5, 0.5, 0.5);
        geo.setSizeModeAbsolute().setAbsoluteSize(200, 200, 200);
        geo.setOpacity(0);

        OBJLoader.load('assets/obj/' + name + '.obj', (buffers) => {
            var myGeo = new Geometry({
                buffers: [
                    { name: 'a_pos',     data: buffers.vertices, size: 3 },
                    { name: 'a_normals', data: buffers.normals,  size: 3 },
                    { name: 'indices',   data: buffers.indices,  size: 1 }
                ]
            });
            geo.setGeometry(myGeo);
        });

        return geo;
    }
}
