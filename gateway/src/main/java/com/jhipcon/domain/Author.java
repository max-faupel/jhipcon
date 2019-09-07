package com.jhipcon.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Author.
 */
@Entity
@Table(name = "author")
public class Author implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "author")
    private Set<Blog> blogs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Author name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Blog> getBlogs() {
        return blogs;
    }

    public Author blogs(Set<Blog> blogs) {
        this.blogs = blogs;
        return this;
    }

    public Author addBlogs(Blog blog) {
        this.blogs.add(blog);
        blog.setAuthor(this);
        return this;
    }

    public Author removeBlogs(Blog blog) {
        this.blogs.remove(blog);
        blog.setAuthor(null);
        return this;
    }

    public void setBlogs(Set<Blog> blogs) {
        this.blogs = blogs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Author)) {
            return false;
        }
        return id != null && id.equals(((Author) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Author{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
