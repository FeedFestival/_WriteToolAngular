export class WriteToolUtils {

    public static baseRequestUrl() {
        return 'http://localhost:8080/' + this.getAnotate() + 'be/';
        // return 'https://gamescrypt.com/be/';
    }

    public static getAnotate(forRequest?) {
        return (forRequest) ? 'WTA' : 'WTA/';
        // return (forRequest) ? this.guid() : '';
    }

    public static guid() {
        const guid = 'xxxxyxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }
}