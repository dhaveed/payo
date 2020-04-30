
const {URL} = require('url');
const base = 'https://ik.imagekit.io/nugitech/';

module.exports = (image, folder = '') => {

  let img = (dimension = null) => {
    dimension = dimension ? `w-${dimension.split(',')[0]},h-${dimension.split(',')[1]}/` : '';
    let i =(setting = null) => image ? new URL(`${base+folder}/${dimension || setting && 'tr:'}${dimension}${setting ? ','+ setting + '/' : ''}${image}`) : null;

    return {
      blur : i('bl-50'),
      clear : i(),
      progressive : i('pr-true')
    }
  }
  return {
    thumnail : img('300,300'),
    preview : img('1000,800'),
    small  : img('450,300'),
    full : img()
  }
}
