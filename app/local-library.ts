import {parseBackup,createBackup} from './library-transfer';
import type {LibraryRecord} from './library-schema';
export const LOCAL_LIBRARY_KEY='sound-atlas-local-library';
export const MODE_KEY='sound-atlas-library-mode';
export function readLocalLibrary(storage:Pick<Storage,'getItem'>):LibraryRecord[]{const raw=storage.getItem(LOCAL_LIBRARY_KEY);return raw?parseBackup(raw):[];}
export function writeLocalLibrary(storage:Pick<Storage,'setItem'>,records:LibraryRecord[]){if(records.length>1000)throw Error('本机资料最多保存 1,000 条，请先导出备份。');storage.setItem(LOCAL_LIBRARY_KEY,createBackup(records));}
