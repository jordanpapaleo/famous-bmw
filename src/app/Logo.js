import View             from 'famous-creative/display/View';

//GL Components
const Color             = FamousPlatform.utilities.Color;
const Geometry          = FamousPlatform.webglGeometries.Geometry;
const GeometryHelper    = FamousPlatform.webglGeometries.GeometryHelper;
const OBJLoader         = FamousPlatform.webglGeometries.OBJLoader;
const Material          = FamousPlatform.webglMaterials.Material;
const TextureRegistry   = FamousPlatform.webglMaterials.TextureRegistry;

export class Logo extends View {
    constructor(node, options) {
        super(node, options);

        this.setAlign(0.5, 0, 0.5).setMountPoint(0.5, 0, 0.5).setOrigin(0.5, 0.5, 0.5);
        this.setSizeModeAbsolute().setAbsoluteSize(150, 150, 150);
        this.setPositionZ(200);
        this.setPositionY(125);
        this.setRotationX(Math.PI * -10 / 180);

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
            gray: '#AAAAAA',
            glossy: '#bbbbdd'
        };

        this.geometries.B.setBaseColor(new Color(color.white));
        this.geometries.M.setBaseColor(new Color(color.white));
        this.geometries.W.setBaseColor(new Color(color.white));
        /*this.geometries.B.mesh.setGlossiness(glossyColor, 60);
        this.geometries.M.mesh.setGlossiness(glossyColor, 60);
        this.geometries.W.mesh.setGlossiness(glossyColor, 60);*/

        this.geometries.first.setBaseColor(new Color(color.white));
        this.geometries.second.setBaseColor(new Color(color.blue));
        this.geometries.third.setBaseColor(new Color(color.white));
        this.geometries.fourth.setBaseColor(new Color(color.blue));
        this.geometries.insideCyl.setBaseColor(new Color(color.darkestGrey));

        this.geometries.outsideCyl.setBaseColor(new Color(color.darkerGrey));
        this.geometries.innerRing.setBaseColor(new Color(color.gray));
        this.geometries.outerRing.setBaseColor(new Color(color.gray));
        /*this.geometries.outsideCyl.mesh.setGlossiness(glossyColor, 100);
        this.geometries.innerRing.mesh.setGlossiness(glossyColor, 100);
        this.geometries.outerRing.mesh.setGlossiness(glossyColor, 100);*/
    }

    objFactory(node, name) {
        let geo = new View(node);
        geo.setAlign(0.5, 0, 0.5).setMountPoint(0.5, 0, 0.5).setOrigin(0.5, 0.5, 0.5);
        geo.setSizeModeAbsolute().setAbsoluteSize(150, 150, 150);
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
