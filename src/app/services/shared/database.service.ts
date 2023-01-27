import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { Base } from "../../models";
import { CrudI } from "../interfaces/crudI.interface";
import { environment as e } from 'src/environments/environment';

export class DataBaseService<T extends Base> implements CrudI<T> {

    tableName!: string;
    supabase!: SupabaseClient

    constructor(tableName: String) {
        this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
    }

    async get(t: T) {
        let data = await this.supabase.from(this.tableName)
            .select('*')
            .match({ id: t.id })
            .single();
        return data;
    }

    async getAll(limit?: number | undefined) {
        let query = this.supabase.from(this.tableName).select('*');
        if (limit) {
            query.limit(limit);
        }
        let data = await query;
        return data;
    }

    async add(t: T) {
        let { data, error } = await this.supabase.from(this.tableName)
            .insert(t)
            .select();
        return { data, error };
    }

    async update(t: T) {
        let { data, error } = await this.supabase.from(this.tableName)
            .update(t)
            .match({ id: t.id })
            .select();
        return { data, error };
    }

    async delete(t: T) {
        let { data, error } = await this.supabase.from(this.tableName)
            .delete()
            .match({ id: t.id });
        return { data, error };
    }

}