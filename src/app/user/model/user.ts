export class User{
    username: string;
    realname: string;
    token: string;
    email: string;
    photo: string;

    constructor(data?:any){
        this.username = (data && data.username) || '';
        this.realname = (data && data.realname) || '';
        this.token = (data && data.token) || '';
        this.email = (data && data.email) || '';
        this.photo = (data && data.photo) || '';
    }
    public setValue(data: object) {
        this.token = data['token'];
        this.photo = data['photo'];
        this.email = data['email'];
        this.username = data['username'];
        this.realname = data['realname'];
    }
}