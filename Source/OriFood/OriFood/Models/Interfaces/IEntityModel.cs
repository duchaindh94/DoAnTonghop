using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models.Interfaces
{
    /// <summary>
    /// Entity model interface declare methods to map Model with Entity and vice versa
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IEntityModel<T> : IIdentifier where T : IIdentifier
    {
        /// <summary>
        /// Used for create operation
        /// </summary>
        /// <returns></returns>
        T ToEntity();
        /// <summary>
        /// Used for get operation
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        IEntityModel<T> MapFromEntity(T entity);
        /// <summary>
        /// Used for update operation
        /// </summary>
        /// <param name="entity"></param>
        void UpdateEntity(T entity);
    }
}