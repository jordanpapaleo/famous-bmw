import View             from 'famous-creative/display/View';

const DynamicGeometry = FamousPlatform.webglGeometries.DynamicGeometry;
const GeometryHelper = FamousPlatform.webglGeometries.GeometryHelper;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;
const Color = FamousPlatform.utilities.Color;

export class Logo extends View {
  constructor(node, options) {
    super(node, options);

    this.parent = new View(this.addChild());
    this.geometries = {};

    const names = ['B', 'M', 'W', 'cross', 'first', 'second', 'third', 'forth', 'innerRing', 'outerRing', 'insideCyl', 'outsideCyl'];

    names.forEach((name) => {
      this.geometries[name] = this.objFactory(name);
    });

    this.geometries.B.setBaseColor(new Color('white'));
    this.geometries.M.setBaseColor(new Color('white'));
    this.geometries.W.setBaseColor(new Color('white'));
    this.geometries.first.setBaseColor(new Color('white'));
    this.geometries.second.setBaseColor(new Color('#54A9D4'));
    this.geometries.third.setBaseColor(new Color('white'));
    this.geometries.forth.setBaseColor(new Color('#54A9D4'));
    this.geometries.insideCyl.setBaseColor(new Color('#222222'));
    this.geometries.outsideCyl.setBaseColor(new Color('#44444'));
    this.geometries.cross.setBaseColor(new Color('#555555'));
    this.geometries.innerRing.setBaseColor(new Color('#aaaaaa'));
    this.geometries.outerRing.setBaseColor(new Color('#aaaaaa'));


    this.parent.setRotationY(0.5);

    // this.M = new View(this.parent.addChild());
    // this.M.setDynamicGeometry(new DynamicGeometry());

    // OBJLoader.load('assets/obj/M.obj', (buffers) => {
    //   this.M.setIndices(buffers.indices);
    //   this.M.setNormals(buffers.normals);
    //   this.M.setTextureCoords(buffers.textureCoords);
    //   this.M.setVertexPositions(buffers.vertices);
    // });

  }

  objFactory(name) {

    let geo = new View(this.parent.addChild());
    geo = new View(this.parent.addChild());
    geo.setAlign(0.5, 0.5, 0.5).setOrigin(0.5, 0.5, 0.5).setMountPoint(0.5, 0.5, 0.5);
    geo.setSizeModeAbsolute();
    geo.setAbsoluteSize(350, 350, 350);
    geo.setDynamicGeometry(new DynamicGeometry());

    OBJLoader.load('assets/obj/'+name+'.obj', (buffers) => {
      geo.setIndices(buffers.indices);
      geo.setNormals(buffers.normals);
      geo.setTextureCoords(buffers.textureCoords);
      geo.setVertexPositions(buffers.vertices);
    });

    return geo;
  }
}
