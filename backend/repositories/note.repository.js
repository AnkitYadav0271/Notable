

class NoteRepository {
    constructor(model){
        this.model = model;
    }
    async findById (id){
        return await this.model.findById(id);
    }

    async create(data){
        return await this.model.create(data);
    }

    async findByUser (user){
        return this.model.find({owner :user});
    }

    async search(keyword){
        return this
    }

    async update (id,updates){
        return await this.model.findByIdAndUpdate(id,updates,{new:true});
    }

    async delete (id){
        return await this.model.findByIdAndDelete(id);
    }
}

export default NoteRepository;