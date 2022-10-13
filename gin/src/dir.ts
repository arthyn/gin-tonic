import path from "path"
const resolved = path.resolve(process.env.TONIC || import.meta.url.replace('file://', ''));
const dir = process.env.TONIC ? resolved : path.dirname(resolved);

export default dir;