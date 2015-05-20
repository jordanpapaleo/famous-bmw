import View             from 'famous-creative/display/View';

const DynamicGeometry = FamousPlatform.webglGeometries.DynamicGeometry;
const GeometryHelper = FamousPlatform.webglGeometries.GeometryHelper;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;
const Material = FamousPlatform.webglMaterials.Material;
const TextureRegistry = FamousPlatform.webglMaterials.TextureRegistry;
const Color = FamousPlatform.utilities.Color;
// import {Material} from 'famous-webgl-materials';
// import {TextureRegistry} from 'famous-webgl-materials';

export class Logo extends View {
  constructor(node, options) {
    super(node, options);

    this.parent = new View(this.addChild());
    this.parent.setAlign(0.5, 0.5, 0.5).setOrigin(0.5, 0.5, 0.5).setMountPoint(0.5, 0.5, 0.5);
    this.geometries = {};

    const names = ['B', 'M', 'W', 'cross', 'first', 'second', 'third', 'forth', 'innerRing', 'outerRing', 'insideCyl', 'outsideCyl'];

    names.forEach((name) => {
      this.geometries[name] = this.objFactory(name);
    });

    let white = new Color('white');
    // let glossyColor = new Color(Material.image([], { texture: 'assets/images/env.png'}));
    let glossyColor = new Color('#bbbbdd');
    this.geometries.B.setBaseColor(new Color('#666666'));
    this.geometries.M.setBaseColor(new Color('#666666'));
    this.geometries.W.setBaseColor(new Color('#666666'));
    this.geometries.first.setBaseColor(white);
    this.geometries.second.setBaseColor(new Color('#54A9D4'));
    this.geometries.third.setBaseColor(white);
    this.geometries.forth.setBaseColor(new Color('#54A9D4'));
    this.geometries.insideCyl.setBaseColor(new Color('#222222'));
    this.geometries.outsideCyl.setBaseColor(new Color('#333333'));
    this.geometries.cross.setBaseColor(new Color('#555555'));
    this.geometries.innerRing.setBaseColor(new Color('#999999'));
    this.geometries.outerRing.setBaseColor(new Color('#999999'));
    this.geometries.B.mesh.setGlossiness(glossyColor, 60);
    this.geometries.M.mesh.setGlossiness(glossyColor, 60);
    this.geometries.W.mesh.setGlossiness(glossyColor, 60);
    this.geometries.cross.mesh.setGlossiness(glossyColor, 100);
    this.geometries.outerRing.mesh.setGlossiness(glossyColor, 100);
    this.geometries.innerRing.mesh.setGlossiness(glossyColor, 100);
    this.geometries.outsideCyl.mesh.setGlossiness(glossyColor, 100);
    this.geometries.insideCyl.mesh.setGlossiness(new Color('#444444'));

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
