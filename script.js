document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    let comments = [];

    // Cargar comentarios almacenados al cargar la página
    loadComments();

    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nameInput = document.getElementById('nameInput');
      const commentInput = document.getElementById('commentInput');

      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      if (name !== '' && comment !== '') {
        if (comment.length <= 300) {
          addComment(name, comment);
          nameInput.value = '';
          commentInput.value = '';
        } else {
          alert('El comentario no puede tener más de 300 caracteres.');
        }
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });

    function addComment(name, comment) {
      // Agregar comentario al array
      comments.push({ name, comment });
      // Guardar comentarios en localStorage
      saveComments();
      // Mostrar comentarios
      displayComments();
    }

    function displayComments() {
      commentsContainer.innerHTML = '';
      comments.forEach(function(comment, index) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
          <strong>${comment.name}</strong>: ${comment.comment}
          <button class="deleteCommentButton" data-index="${index}"><i class="fas fa-trash-alt"></i></button> <!-- Botón para eliminar comentario con icono de papelera -->
        `;
        commentsContainer.appendChild(commentElement);
      });

      // Agregar evento de clic a cada botón de eliminar comentario
      const deleteCommentButtons = document.querySelectorAll('.deleteCommentButton');
      deleteCommentButtons.forEach(button => {
        button.addEventListener('click', function() {
          const index = button.getAttribute('data-index');
          deleteComment(index);
        });
      });
    }

    function saveComments() {
      localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
      const storedComments = localStorage.getItem('comments');
      if (storedComments) {
        comments = JSON.parse(storedComments);
        displayComments();
      }
    }

    function deleteComment(index) {
      comments.splice(index, 1); // Eliminar el comentario en el índice especificado
      saveComments(); // Guardar los comentarios actualizados
      displayComments(); // Mostrar los comentarios actualizados
    }
});
